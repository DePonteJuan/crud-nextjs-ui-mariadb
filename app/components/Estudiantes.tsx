"use client";
import {
  ChipProps,
  User,
  Chip,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Link,
} from "@nextui-org/react";
import React, { useState } from "react";
import { columns, users } from "./data";
import { PlusIcon } from "./icons/PlusIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { VerticalDotsIcon } from "./icons/VerticalDotsIcon";
import { conn } from "@/libs/mysql";

const statusColorMap: Record<string, ChipProps["color"]> = {
  student: "success",
  teacher: "danger",
  admin: "warning",
};
type User = (typeof users)[0];

export default function Estudiantes() {
  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedItemId, setSelectedItemId] = useState(null);
  const handleDropdownSelect = (selectedItem) => {
    setSelectedItemId(selectedItem);
    console.log(selectedItem);
    onOpen();
  };
  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsers;
  }, [users, filterValue]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
            classNames={{
              description: "text-default-500",
            }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-500">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon
                    className="text-default-400"
                    width={undefined}
                    height={undefined}
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>
                  <li onClick={() => handleDropdownSelect(user)}>Editar</li>
                </DropdownItem>

                <DropdownItem>Eliminar</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Buscar por nombre..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Popover placement="bottom" showArrow offset={10}>
              <PopoverTrigger>
                <Button
                  className="bg-foreground text-background"
                  endContent={<PlusIcon width={undefined} height={undefined} />}
                  size="sm"
                >
                  Agregar
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px]">
                {columns.map((column) => (
                  <>
                    <Input
                      defaultValue={""}
                      label={column.name}
                      key={column.uid}
                      size="md"
                      variant="bordered"
                      required
                    />
                  </>
                ))}
                <Button
                  className="bg-foreground text-background"
                  endContent={<PlusIcon width={undefined} height={undefined} />}
                  size="sm"
                >
                  Agregar
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );
  //creando el efecto de pop-up al hacer click
  const popUp = React.useMemo(() => {
    return (
      <PopoverContent className="w-[250px]">
        {columns.map((column) => (
          <Input
            defaultValue={""}
            label={column.name}
            key={column.uid}
            size="md"
            variant="bordered"
            required
          />
        ))}
        <Button />
      </PopoverContent>
    );
  }, []);

  return (
    <>
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        classNames={classNames}
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"usuario no encontrado..."}
          items={filteredItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Editar</ModalHeader>
              <ModalBody>
                {columns.map((column) => (
                  <Input
                    defaultValue={
                      selectedItemId ? selectedItemId[column.uid] : ""
                    }
                    placeholder={
                      selectedItemId ? selectedItemId[column.uid] : ""
                    }
                    label={column.name}
                    key={column.uid}
                    size="md"
                    variant="bordered"
                    required
                  />
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Cambiar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
