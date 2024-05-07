export default interface IDataTableColumn {
    id: string;
    label: string;
    minWidth?: number;
    width?: number;
    align?: 'right';
    type?: string,
    format?: (value: number) => string;
}