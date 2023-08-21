/// <reference types="mongoose/types/schematypes" />
export namespace ITEM_GID {
    let type: typeof Schema.Types.Number;
    let min: number;
    let max: number;
    let required: boolean;
    function set(v: any): number;
}
export namespace ITEM_GID_KEY {
    let type_1: typeof Schema.Types.String;
    export { type_1 as type };
    export let match: RegExp;
    let required_1: boolean;
    export { required_1 as required };
    export namespace validate {
        function validator(v: any): boolean;
        function message(props: any): string;
    }
}
export namespace ITEM_LID {
    let type_2: typeof Schema.Types.Number;
    export { type_2 as type };
    let min_1: number;
    export { min_1 as min };
    let max_1: number;
    export { max_1 as max };
    let required_2: boolean;
    export { required_2 as required };
    export function set_1(v: any): number;
    export { set_1 as set };
}
export namespace GROUP_GID {
    let type_3: typeof Schema.Types.Number;
    export { type_3 as type };
    let min_2: number;
    export { min_2 as min };
    let max_2: number;
    export { max_2 as max };
    let required_3: boolean;
    export { required_3 as required };
    export function set_2(v: any): number;
    export { set_2 as set };
}
export namespace GROUP_LID {
    let type_4: typeof Schema.Types.Number;
    export { type_4 as type };
    let _enum: number[];
    export { _enum as enum };
    let required_4: boolean;
    export { required_4 as required };
    export function set_3(v: any): number;
    export { set_3 as set };
}
export namespace STANDART_XL_GROUP {
    let type_5: typeof Schema.Types.Number;
    export { type_5 as type };
    let min_3: number;
    export { min_3 as min };
    let max_3: number;
    export { max_3 as max };
    let required_5: boolean;
    export { required_5 as required };
    export function set_4(v: any): number;
    export { set_4 as set };
}
import { Schema } from "mongoose";
