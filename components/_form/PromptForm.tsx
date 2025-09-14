"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputSchema } from "@/lib/schema";
import { ChatTextarea } from "@/components/_inputs/TextInput";
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';

type FormValues = {
  prompt: string;
};

const PromptForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(InputSchema),
  });

  const { sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/roast'
    })
  })

  console.log('status', status)

  const submitHandler = async (data: FormValues) => {
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
            maxLengthHint={5000}
            disabled={isSubmitting || status !== 'ready'}
            // Call form submit manually when ChatTextarea submits
            onSubmit={async () => {
              await handleSubmit(submitHandler)();
            }}
          />
        )}
      />
      {errors?.prompt && (
        <p className="absolute -bottom-6 left-0 text-sm text-red-600">
          {String(errors.prompt.message)}
        </p>
      )}
    </form>
  );
};

export default PromptForm;
