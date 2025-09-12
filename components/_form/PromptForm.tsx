"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputSchema } from "@/lib/schema";
import { ChatTextarea } from '@/components/_inputs/TextInput'

type FormValues = {
  prompt: string;
};

const PromptForm = () => {
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(InputSchema),
  });

  const submitHandler = (data: FormValues) => {
    console.log("Submitted prompt:", data.prompt);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="relative mx-auto flex w-full max-w-2xl items-end gap-6"
    >
      <Controller
        name="prompt"
        control={control}
        render={({ field }) => (
          <ChatTextarea
            value={field.value}
            onChange={field.onChange}
            placeholder="Roast my idea…"
            submitOnEnter
            maxHeight={260}
            minRows={1}
            label="Prompt input"
            showCounter
            maxLengthHint={2000}
            // Call form submit manually when ChatTextarea submits
            onSubmit={async () => {
              await handleSubmit(submitHandler)();
            }}
          />
        )}
      />
    </form>
  );
};

export default PromptForm;