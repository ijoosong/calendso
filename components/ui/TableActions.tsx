import { Menu, Transition } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import React, { FC, Fragment } from "react";

import classNames from "@lib/classNames";
import { SVGComponent } from "@lib/types/SVGComponent";

import Button from "./Button";

type ActionType = {
  id: string;
  icon: SVGComponent;
  label: string;
  disabled?: boolean;
} & ({ href?: never; onClick: () => any } | { href: string; onClick?: never });

interface Props {
  actions: ActionType[];
}

const TableActions: FC<Props> = ({ actions }) => {
  return (
    <>
      <div className="space-x-2 hidden lg:block">
        {actions.map((action) => (
          <Button
            key={action.id}
            data-testid={action.id}
            href={action.href}
            onClick={action.onClick}
            StartIcon={action.icon}
            disabled={action.disabled}
            color="secondary">
            {action.label}
          </Button>
        ))}
      </div>
      <Menu as="div" className="inline-block lg:hidden text-left ">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="text-neutral-400 mt-1 p-2 border border-transparent hover:border-gray-200">
                <span className="sr-only">Open options</span>
                <DotsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95">
              <Menu.Items
                static
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-neutral-100">
                <div className="py-1">
                  {actions.map((action) => {
                    const Element = typeof action.onClick === "function" ? "span" : "a";
                    return (
                      <Menu.Item key={action.id} disabled={action.disabled}>
                        {({ active }) => (
                          <Element
                            href={action.href}
                            onClick={action.onClick}
                            className={classNames(
                              active ? "bg-neutral-100 text-neutral-900" : "text-neutral-700",
                              "group flex items-center px-4 py-2 text-sm font-medium"
                            )}>
                            <action.icon
                              className="mr-3 h-5 w-5 text-neutral-400 group-hover:text-neutral-500"
                              aria-hidden="true"
                            />
                            {action.label}
                          </Element>
                        )}
                      </Menu.Item>
                    );
                  })}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
};

export default TableActions;
