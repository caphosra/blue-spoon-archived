module RandomSort{
    export function Do(list: any[]): any[]{
        let n = list.length;
        let temp = 0, i = 0;
        
        while (n) {
            i = Math.floor(Math.random() * n--);
            temp = list[n];
            list[n] = list[i];
            list[i] = temp;
        }
        
        return list;
    }
}