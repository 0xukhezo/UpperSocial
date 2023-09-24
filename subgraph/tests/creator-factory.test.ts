import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { NewFragmentPool } from "../generated/schema"
import { NewFragmentPool as NewFragmentPoolEvent } from "../generated/CreatorFactory/CreatorFactory"
import { handleNewFragmentPool } from "../src/creator-factory"
import { createNewFragmentPoolEvent } from "./creator-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let instance = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let userId = BigInt.fromI32(234)
    let newNewFragmentPoolEvent = createNewFragmentPoolEvent(
      owner,
      instance,
      userId
    )
    handleNewFragmentPool(newNewFragmentPoolEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewFragmentPool created and stored", () => {
    assert.entityCount("NewFragmentPool", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewFragmentPool",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NewFragmentPool",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "instance",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "NewFragmentPool",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "userId",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
