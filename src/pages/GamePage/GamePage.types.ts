export interface GamePageProps {
    ind: number;
}

export interface Column {
    label: string;
    width: string;
}

export interface MovesTableRow {
    id: number;
    white?: string;
    black?: string;
}
