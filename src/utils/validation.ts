export const validate = {
  name: (v: string) => {
    if (!v.trim()) return "Введи полное имя";
    if (/\d/.test(v)) return "Имя не должно содержать цифры";
    if (/[^a-zA-Zа-яА-ЯёЁ\s\-']/.test(v)) return "Имя должно содержать только буквы";
    if (v.trim().length < 2) return "Имя слишком короткое";
    return "";
  },
  email: (v: string) => {
    if (!v.trim()) return "Введи email";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Некорректный email адрес";
    return "";
  },
  phone: (v: string) => {
    if (!v.trim()) return "Введи номер телефона";
    if (!/^[+\d][\d\s\-()]{6,18}$/.test(v)) return "Некорректный номер телефона";
    return "";
  },
  password: (v: string) => {
    if (!v) return "Введи пароль";
    if (v.length < 8) return "Минимум 8 символов";
    if (!/[A-Z]/.test(v)) return "Добавь заглавную букву";
    if (!/[0-9]/.test(v)) return "Добавь цифру";
    return "";
  },
  confirmPassword: (pwd: string, confirm: string) => {
    if (!confirm) return "Повтори пароль";
    if (pwd !== confirm) return "Пароли не совпадают";
    return "";
  },
  contact: (v: string) => {
    if (!v.trim()) return "Введи email или номер телефона";
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const isPhone = /^[+\d][\d\s\-()]{6,18}$/.test(v);
    if (!isEmail && !isPhone) return "Введи корректный email или номер телефона";
    return "";
  },
};