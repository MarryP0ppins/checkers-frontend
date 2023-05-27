import { ActionCreatorWithoutPayload, createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { CheckerColor, CheckerProperty } from 'classes/Game/game.types';
import { MovesTableRow } from 'pages/GamePage/GamePage.types';
import { getMovesAction } from 'store/actions/move';
import { normalizeGameMoves, normalizeLastMoves } from 'store/normalizers/move';
import { FetchStatus } from 'types/api';

export interface MoveState {
    lastMoves: CheckerProperty[];
    gameMoves: MovesTableRow[];
    fetchGameMovesStatus: FetchStatus;
    error: unknown;
}

const initialState: MoveState = {
    lastMoves: [],
    gameMoves: [],
    fetchGameMovesStatus: FetchStatus.INITIAL,
    error: null,
};

const moveSlice = createSlice<MoveState, SliceCaseReducers<MoveState>>({
    name: 'move',
    initialState,
    reducers: {
        reset: () => initialState,
        newMove: (state, action: PayloadAction<{ color: CheckerColor; newMove: string }>) => {
            const { color, newMove } = action.payload;
            const gameMoves = state.gameMoves;
            if (gameMoves.at(-1)?.white !== '' && gameMoves.at(-1)?.black !== '') {
                gameMoves.push({
                    id: gameMoves.length + 1,
                    white: color === CheckerColor.WHITE ? newMove : '',
                    black: color === CheckerColor.BLACK ? newMove : '',
                });
            } else {
                gameMoves[gameMoves.length - 1] = {
                    id: gameMoves[gameMoves.length - 1].id,
                    white: color === CheckerColor.WHITE ? newMove : gameMoves[gameMoves.length - 1].white,
                    black: color === CheckerColor.BLACK ? newMove : gameMoves[gameMoves.length - 1].black,
                };
            }
            state.gameMoves = gameMoves;
            return;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovesAction.pending, (state) => {
                state.fetchGameMovesStatus = FetchStatus.FETCHING;
                state.error = null;
            })
            .addCase(getMovesAction.fulfilled, (state, { payload }) => {
                state.fetchGameMovesStatus = FetchStatus.FETCHED;
                state.gameMoves = normalizeGameMoves(payload);
                state.lastMoves = normalizeLastMoves(payload.filter((move) => move.is_last_move));
            })
            .addCase(getMovesAction.rejected, (state, { error }) => {
                state.fetchGameMovesStatus = FetchStatus.ERROR;
                state.error = error;
            });
    },
});

export const { newMove } = moveSlice.actions;
export const resetMoveState = moveSlice.actions.reset as ActionCreatorWithoutPayload<string>;
export const moveReducer = moveSlice.reducer;
