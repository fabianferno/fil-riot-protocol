import { createFileEncoderStream, CAREncoderStream } from "ipfs-car";

const file = new Blob(["Hello ipfs-car!"]);
let rootCID;

await createFileEncoderSt ream(file)
  .pipeThrough(
    new TransformStream({
      transform(block, controller) {
        rootCID = block.cid;
        controller.enqueue(block);
      },
    })
  )
  .pipeThrough(new CAREncoderStream())
  .pipeTo(new WritableStream());

console.log(rootCID.toString());
