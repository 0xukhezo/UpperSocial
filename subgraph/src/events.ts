import { NewFragmentPool as NewFragmentPoolEvent } from "../generated/CreatorFactory/CreatorFactory";
import { Trade as TradeEvent } from "../generated/templates/FragmentPool/FragmentPool";
import { FragmentPool, Trade } from "../generated/schema";
import { FragmentPool as FragmentPoolTemplate } from "../generated/templates";

export function handleFragmentPool(event: NewFragmentPoolEvent): void {
  let entity = new FragmentPool(event.params.instance);
  entity.owner = event.params.owner;
  entity.instance = event.params.instance;
  entity.userId = event.params.userId;
  entity.underlyingAsset = event.params.underlyingAsset;
  entity.market = event.params.market;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  FragmentPoolTemplate.create(event.params.instance);

  entity.save();
}

export function handleTrade(event: TradeEvent): void {
  let entity = new Trade(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.pool = event.transaction.from; // IS the pool?
  entity.creator = event.params.creator;
  entity.buyer = event.params.user;
  entity.isBuy = event.params.isBuy;
  entity.amountTokens = event.params.fragmentAmount;
  entity.totalPrice = event.params.totalPrice;
  entity.protocolPrice = event.params.protocolPrice;
  entity.creatorPrice = event.params.creatorPrice;
  entity.supply = event.params.supply;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  let pool = new FragmentPool(event.transaction.from);
  pool.supply = event.params.supply;
  pool.save();
}
