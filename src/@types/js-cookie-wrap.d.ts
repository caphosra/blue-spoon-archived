declare var Cookies: ICookieControler;

interface ICookieControler{
    set(tag: string, val: string): void;
    get(tag: string): string;
    remove(tag: string): void;
}