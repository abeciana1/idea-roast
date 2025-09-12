'use client'
import React, {
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  forwardRef,
} from "react";

/**
 * ChatTextarea — a reusable auto-growing textarea that behaves like ChatGPT's composer.
 *
 * Features
 * - Grows with content up to a maxHeight, then scrolls
 * - Submit on Enter, newline on Shift+Enter (configurable)
 * - Controlled or uncontrolled usage
 * - Accessible label (visually hidden by default)
 * - Optional character counter
 * - Tailwind-ready styling
 */
export type ChatTextareaProps = {
  /** Controlled value */
  value?: string;
  /** Controlled onChange */
  onChange?: (value: string) => void;
  /** Uncontrolled default value */
  defaultValue?: string;
  /** Placeholder text */
  placeholder?: string;
  /** When user submits (Enter). Return true if you handled clearing the value */
  onSubmit?: (value: string) => void | Promise<void>;
  /** Disable Enter-to-submit (use Shift+Enter only for newlines) */
  submitOnEnter?: boolean;
  /** Max height before internal scroll kicks in (px) */
  maxHeight?: number;
  /** Min rows (visual height floor) */
  minRows?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Show a character counter (uses `value.length`) */
  showCounter?: boolean;
  /** Max length to display alongside counter (does not hard-limit input) */
  maxLengthHint?: number;
  /** Input name/id hooks */
  name?: string;
  id?: string;
  /** ARIA label. If provided, a visually hidden label is rendered. */
  label?: string;
  /** Wrapper class */
  className?: string;
  /** Textarea class */
  textareaClassName?: string;
  /** Auto focus on mount */
  autoFocus?: boolean;
};

export type ChatTextareaHandle = {
  focus: () => void;
  setValue: (v: string) => void;
  getValue: () => string;
  textarea: HTMLTextAreaElement | null;
};

export const ChatTextarea = forwardRef<ChatTextareaHandle, ChatTextareaProps>(
  function ChatTextarea(
    {
      value,
      onChange,
      defaultValue,
      placeholder = "Type your message…",
      onSubmit,
      submitOnEnter = true,
      maxHeight = 260,
      minRows = 1,
      disabled = false,
      showCounter = false,
      maxLengthHint,
      name,
      id,
      label,
      className = "",
      textareaClassName = "",
      autoFocus = false,
    },
    ref
  ) {
    const internalId = useId();
    const finalId = id ?? internalId;

    const isControlled = typeof value === "string";
    const [inner, setInner] = useState(defaultValue ?? "");
    const currentValue = isControlled ? value! : inner;

    const taRef = useRef<HTMLTextAreaElement | null>(null);

    const resize = useCallback(() => {
      const ta = taRef.current;
      if (!ta) return;
      // Reset to auto so shrink also works
      ta.style.height = "auto";
      // Calculate new height
      const next = Math.min(ta.scrollHeight, maxHeight);
      ta.style.height = `${next}px`;
      // Toggle overflow when capped
      ta.style.overflowY = ta.scrollHeight > maxHeight ? "auto" : "hidden";
    }, [maxHeight]);

    useLayoutEffect(() => {
      resize();
    }, [currentValue, resize]);

    useEffect(() => {
      if (autoFocus) taRef.current?.focus();
    }, [autoFocus]);

    const setVal = useCallback(
      (v: string) => {
        if (isControlled) {
          onChange?.(v);
        } else {
          setInner(v);
        }
      },
      [isControlled, onChange]
    );

    useImperativeHandle(
      ref,
      () => ({
        focus: () => taRef.current?.focus(),
        setValue: setVal,
        getValue: () => currentValue,
        textarea: taRef.current,
      }),
      [currentValue, setVal]
    );

    const handleKeyDown = async (
      e: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
      if (disabled) return;

      if (submitOnEnter && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const text = currentValue.trim();
        if (!text) return;
        await onSubmit?.(currentValue);
        // If uncontrolled, clear it ourselves
        if (!isControlled) setInner("");
      }
    };

    const lineHeight = 24; // keep in sync with Tailwind leading-[1.5]
    const minHeight = Math.max(minRows, 1) * lineHeight + 16; // + padding-y (py-2 => 8*2)

    return (
      <div className={`w-full max-w-none ${className}`}>
        {label && (
          <label htmlFor={finalId} className="sr-only">
            {label}
          </label>
        )}

        <div className="flex items-end gap-2 rounded-2xl border border-gray-300 bg-white p-2 shadow-sm focus-within:border-gray-400">
          <textarea
            ref={taRef}
            id={finalId}
            name={name}
            disabled={disabled}
            value={currentValue}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            onChange={(e) => setVal(e.target.value)}
            rows={minRows}
            style={{
              height: Math.max(minHeight, 0),
              maxHeight,
              overflowY: "hidden",
              resize: "none",
            }}
            className={`min-h-[${minHeight}px] w-full flex-1 bg-transparent outline-none placeholder:text-gray-400 text-base leading-[1.5] py-2 px-3 ${textareaClassName}`}
          />

          {/* Action area (example: submit button, attach, mic, etc.) */}
          <button
            type="button"
            aria-label="Submit"
            disabled={disabled || !currentValue.trim()}
            onClick={async () => {
              if (!currentValue.trim()) return;
              await onSubmit?.(currentValue);
              if (!isControlled) setInner("");
            }}
            className="shrink-0 rounded-xl px-3 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 hover:bg-gray-50"
          >
            Send
          </button>
        </div>

        {showCounter && (
          <div className="mt-1 text-right text-xs text-gray-500">
            {currentValue.length}
            {maxLengthHint ? ` / ${maxLengthHint}` : ""}
          </div>
        )}
      </div>
    );
  }
);
