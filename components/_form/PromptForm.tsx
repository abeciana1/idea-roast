"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputSchema } from "@/lib/schema";
import { ChatTextarea } from "@/components/_inputs/TextInput";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Footer from '@/components/_general/Footer'
import MessageContainer from '@/components/_chat/Messages'

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

  const { messages, status, error, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/roast",
    }),
    onError: error => {
      console.error('Error streaming text:', error);
    },
  });

  console.log('error', error)
  console.log("status", status);
  console.log('form message', messages)

  const submitHandler = async (data: FormValues) => {
    console.log("Submitted prompt:", data.prompt);
    reset();
    await sendMessage({text: data.prompt})
  };

  return (
    <>
      <MessageContainer status={status} messages={messages} />
      <section className='fixed space-y-6 bottom-12 w-full pb-12 bg-background'>
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
                disabled={isSubmitting || status !== "ready"}
                onSubmit={async () => {
                  await handleSubmit(submitHandler)();
                }}
                error={errors?.prompt?.message as string}
              />
            )}
          />
        </form>
      </section>
    </>
  );
};

export default PromptForm;
