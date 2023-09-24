import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { NewFragmentPool } from "../generated/CreatorFactory/CreatorFactory"

export function createNewFragmentPoolEvent(
  owner: Address,
  instance: Address,
  userId: BigInt
): NewFragmentPool {
  let newFragmentPoolEvent = changetype<NewFragmentPool>(newMockEvent())

  newFragmentPoolEvent.parameters = new Array()

  newFragmentPoolEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  newFragmentPoolEvent.parameters.push(
    new ethereum.EventParam("instance", ethereum.Value.fromAddress(instance))
  )
  newFragmentPoolEvent.parameters.push(
    new ethereum.EventParam("userId", ethereum.Value.fromUnsignedBigInt(userId))
  )

  return newFragmentPoolEvent
}
