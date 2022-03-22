import { Transfer } from "../generated/Contract/Contract";
import { Kid, Holder } from "../generated/schema";

export function handleTransfer(event: Transfer): void {
  let kid = Kid.load(event.params.tokenId.toString());

  if (kid === null) {
    kid = new Kid(event.params.tokenId.toString());
  }

  kid.owner = event.params.to.toHexString();
  kid.save();

  let holder = Holder.load(event.params.to.toHexString());
  if (!holder) {
    holder = new Holder(event.params.to.toHexString());
    holder.save();
  }
}
