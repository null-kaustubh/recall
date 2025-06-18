export default function random(len: number): string {
  let opt = "qyuc5vb3nmjhfas75qfdhj1gda6dio2pa8wer00t47sdfg9hjklzx5";
  let length: number = opt.length;
  let res: string = "";
  for (let i = 0; i < len; i++) {
    res += opt[Math.floor(Math.random() * length)];
  }
  return res;
}
