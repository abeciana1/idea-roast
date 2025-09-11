"use client";
import { Controller, useForm } from "react-hook-form";
import { Form, Input, Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputSchema } from "@/lib/schema";
import { Send } from "lucide-react";

const PromptForm = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(InputSchema),
  });

  const submitHandler = () => {};

  return (
    <Form onSubmit={handleSubmit(submitHandler)} className="">
      <Controller
        control={control}
        name="prompt"
        render={({
          field: { name, value, onChange, ref },
          fieldState: { invalid, error },
        }) => (
          <Input
            ref={ref}
            label="Tell me about your business idea"
            labelPlacement="inside"
            isRequired
            validationBehavior="aria"
            value={value}
            name={name}
            errorMessage={error?.message}
            isInvalid={invalid}
            onChange={onChange}
          />
        )}
      />
      <Button type="submit">
        <Send
          size={24}
          className="text-foreground"
          strokeWidth={3}
          absoluteStrokeWidth
        />
      </Button>
    </Form>
  );
};

export default PromptForm;
