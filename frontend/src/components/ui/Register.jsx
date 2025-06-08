import React from "react";
import Navbar from "./componets_things/Navbar";
import { Label } from "./label";
import { Input } from "./input";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Button } from "./button";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-red-900 rounded-xl p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Register</h1>
          <div className="my-2 ">
            <Label className="mb-1">Name</Label>
            <Input type="text" placeholder="John doe"></Input>
          </div>
          <div className="my-2 ">
            <Label className="mb-1">Email</Label>
            <Input type="text" placeholder="Johndoe@gmail.com"></Input>
          </div>
          <div className="my-2 ">
            <Label className="mb-1">Password</Label>
            <Input type="Password" placeholder="**********"></Input>
          </div>
          <div className="my-2 ">
            <Label className="mb-1">Phone Number</Label>
            <Input type="tel" placeholder="+123456789"></Input>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-3 space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                id="r1"
                className="cursor-pointer"
              />
              <Label htmlFor="r1">Student</Label>
            </div>
            <div className="flex items-center gap-3">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                id="r2"
                className="cursor-pointer"
              />
              <Label htmlFor="r2">Recruiter</Label>
            </div>
            <div className="items-center gap-2">
                <Label>Profile Photo</Label>
                <Input type="file" accept= "image" className="cursor-pointer"></Input>
            </div>
          </div>
          <Button className="block w-full mt-3 rounded-md text-white">Submit</Button>
          <p className="mt-2 text-red-800">Already have an account ? <Link className="text-black" to={"/login"}>Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
