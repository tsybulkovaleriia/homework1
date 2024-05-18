"use client";
import {useForm, SubmitHandler, Controller} from "react-hook-form";
import { Item, useToDoState } from "@/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FC } from "react";
import DatePicker from "react-datepicker";

type Inputs = {
  title: string;
  description: string;
  enddate: string;
  priotiry: string;
};


const Create: FC = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();


  const addToDo = useToDoState((state) => state.addItem);

  const onSubmit: SubmitHandler<Inputs> = async ({ title , description, priority, enddate}) => {
    const supabase = createClientComponentClient();

    const item = {
      title,
      description,
      enddate,
      startdate: new Date(),
      priority,
      status: false,
    } as Item;

    console.log(item)

    const { error, data } = await supabase
      .from("todos")
      .insert(item)
      .select()
      .single();

    if (!error) {
      addToDo(data);
      reset();
    }
  };

  return (
    <div className="my-10">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-black-500 rounded-lg grow px-4 py-2 focus-within:border-primary border border-transparent">
          <input
            className="w-full appearance-none bg-transparent outline-0 placeholder:text-secondary/50 appearance-none"
            placeholder="create your next task..."
            {...register("title", {
              required: "Your next task can not be empty",
              minLength: {
                value: 4,
                message: "title must be at least 4 characters.",
              },
            })}
          />
        </div>
        <div className="bg-black-500 rounded-lg grow px-4 py-2 focus-within:border-primary border border-transparent">
          <input
            className="w-full bg-transparent outline-0 placeholder:text-secondary/50 appearance-none" placeholder="add your description here"
            {...register("description", {required: "Your next task can not be empty"})}
          />
        </div>
        <div className="bg-black-500 rounded-lg grow px-4 py-2 focus-within:border-primary border border-transparent">
          <select
            className="w-full appearance-none bg-transparent outline-0 placeholder:text-secondary/50 appearance-none"
            {...register("priority", {
           })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="bg-black-500 rounded-lg grow px-4 py-2 focus-within:border-primary border border-transparent">
          <Controller
            name={"enddate"}
            control={control}
            {...register("enddate", {required: "Your next task can not be empty"})}
            render={({ field: { onChange, value } }) => {
              return (
                <DatePicker
                  onChange={onChange}
                  selected={value}
                  placeholderText="Enter your end date"
                />
              );
            }}
          />
        </div>
        <button
          className="w-10 h-10 bg-primary flex justify-center items-center rounded-full text-black hover:rotate-90 duration-300"
          type="submit"
        >
          <svg className="w-5 h-5" viewBox="0 0 1024 1024">
            <path
              d="M640 469.333333h170.666667a42.666667 42.666667 0 0 1 0 85.333334h-170.666667a42.666667 42.666667 0 0 1 0-85.333334z m-85.333333 341.333334a42.666667 42.666667 0 0 1-85.333334 0v-256H213.333333a42.666667 42.666667 0 0 1 0-85.333334h256V213.333333a42.666667 42.666667 0 0 1 85.333334 0v597.333334z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </form>
      {errors.title && (
        <p className='text-xs mt-2 opacity-70 before:content-["*"] before:text-primary'>
          {errors.title.message}
        </p>
      )}
    </div>
  );
};

export default Create;
