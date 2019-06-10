interface ICookieControl{
    set(tag: string, val: string): void;
    get(tag: string): string;
    remove(tag: string): void;
}