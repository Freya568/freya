"use client";

import { useState } from "react";

export function SubscribeForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="mt-8 max-w-xl"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="flex items-stretch border border-[#0e0807]/15 bg-white">
        <label htmlFor="email" className="sr-only">
          输入邮箱
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="输入邮箱"
          autoComplete="email"
          className="min-w-0 flex-1 bg-transparent px-4 py-4 font-mono text-[11px] tracking-[0.14em] outline-none placeholder:text-[#0e0807]/45"
        />
        <button
          type="submit"
          aria-label="提交订阅"
          className="grid w-14 place-items-center bg-[#0e0807] text-[#f8f6f3] transition-colors duration-300 hover:bg-[#2a211f]"
        >
          <span aria-hidden>→</span>
        </button>
      </div>
      {sent ? (
        <p className="mt-3 font-mono text-[11px] tracking-[0.08em]" role="status">
          已留在这台浏览器里。参考版不会把邮箱发出去。
        </p>
      ) : null}
    </form>
  );
}
