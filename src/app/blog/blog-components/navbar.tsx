//最上面的Navbar
"use client";
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import SignInButton from "@/app/blog/api-components/SignInButton";
import { signOut } from "next-auth/react";
import CreateButton from "@/app/blog/buttons/createbutton";


export function MyNavBar() {
    const [currentUser, setCurrentUser] = useState<Session | null>(null);

    useEffect(() => {
        getSessionInfo()
    }, []);

    async function getSessionInfo() {
        // 獲取當前登入用戶 ID
        const session = await getSession();

        if (session) {
            if (session?.user?.name !== undefined) {
                setCurrentUser(session);
            } else {
                setCurrentUser(null);
            }
        }
    }

    <button
        className="bg-slate-600 px-4 py-2 text-white"
        onClick={() => signOut({ callbackUrl: "/" })}
        type="button"
    >
        Sign Out of GitHub
    </button>



    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold text-inherit">BLOG</p>
            </NavbarBrand>


            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {currentUser ?
                    <CreateButton />
                    : null}
            </NavbarContent>



            <NavbarContent as="div" justify="end">
                {currentUser ?
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name={currentUser?.user?.name ?? ''}
                                size="sm"
                                src={currentUser?.user?.image ?? ''}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat" disabledKeys={["profile"]}>
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">{currentUser?.user?.name ?? ''}</p>
                            </DropdownItem>
                            <DropdownItem onClick={() => signOut({ callbackUrl: "/blog" })} key="logout" color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    : <SignInButton />}
            </NavbarContent>

        </Navbar>
    );
}