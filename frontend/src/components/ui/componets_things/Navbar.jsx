import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import React from "react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../button";
import { LogOut, User2 } from "lucide-react";
const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white ">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-rose-500">Cuddle</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <ul className="flex font-medium items-center gap-6">
            <li>Home</li>
            <li>Browse</li>
            <li>Jobs</li>
          </ul>
          {!user ? (
            <div className="flex ">
              <div className="mr-1">
                <Link to={"/login"}>
                  <Button variant="outline">Login</Button>
                </Link>
              </div>
              <div className="ml-2">
                <Link to={"/register"}>
                  <Button className="bg-amber-600" variant="outline">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback></AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 m-2 border border-amber-800 p-4 rounded-2xl">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="mt-2 cursor-pointer ml-1.5 mr-1.5">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Ankit Singh</h3>
                    <p className="text-sm ">
                      Lorem ipsum dolor sit amet consectetur rgegehget e
                      htrehrththrthrth h rthhr
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex w-fit items-center gap-2 ml-1">
                    <User2 />
                    <Button variant="link">Profile</Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer ml-1">
                    <LogOut />
                    <Button variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
