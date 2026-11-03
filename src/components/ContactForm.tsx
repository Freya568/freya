"use client";

import { FormEvent, useState } from "react";
import { site } from "@/data/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const body = encodeURIComponent(`姓名：${name}\n邮箱：${email}\n\n${message}`);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`来自 ${name || "网站"} 的消息`)}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="mt-12 max-w-xl">
      <label className="block text-xs text-ink" htmlFor="name">
        姓名
      </label>
      <input
        id="name"
        name="name"
        required
        className="mt-2 w-full border-b border-line-strong bg-transparent py-3 text-sm outline-none"
      />
      <label className="mt-6 block text-xs text-ink" htmlFor="email">
        邮箱
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="mt-2 w-full border-b border-line-strong bg-transparent py-3 text-sm outline-none"
      />
      <label className="mt-6 block text-xs text-ink" htmlFor="message">
        想聊的事
      </label>
      <textarea
        id="message"
        name="message"
        required
        rows={5}
        className="mt-2 w-full resize-y border-b border-line-strong bg-transparent py-3 text-sm outline-none"
      />
      <button type="submit" className="mt-8 inline-flex h-11 items-center rounded-full bg-black px-5 text-sm text-white">
        通过邮件发送
      </button>
      {sent ? <p className="mt-4 text-sm text-ink">已打开邮件草稿。若没有弹出，请直接写给 {site.email}。</p> : null}
    </form>
  );
}
