/* eslint-disable array-callback-return */
import React, { FC } from 'react';
import { Availability } from 'goldilocksTypes';
import SwapListEntry from './SwapListEntry';

interface Swaps {
  swaps: Array<Availability>,
}

const SwapList: FC<Swaps> = ({ swaps }) => {
  const swapRender = (someSwaps: Array<Availability>) => someSwaps.map((swap) => {
    if (swap.guestId) {
      const { guestId } = swap;
      return (
        <div>
          <SwapListEntry
            swap={swap}
            guestId={guestId}
            margin-bottom="10px"
            type="con"
          />
        </div>
      );
    }
    if (swap.requester_ids) {
      return swap.requester_ids.map((requester: number) => {
        const guestId = requester;
        return (
          <div>
            <SwapListEntry
              swap={swap}
              guestId={guestId}
              margin-bottom="10px"
              type="req"
            />
          </div>
        );
      });
    }
    return 'whoops';
  });

  return (
    <>
      {swapRender(swaps)}
    </>
  );
};

export default SwapList;
