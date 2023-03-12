export interface IBook{
  BookId:string,
  BookName:string,
  Price:number,
  Image:string,
  Describe:string,
  Amount:number,
  MaCD:string,
  MaNXB:string,
}
export class Book{
  constructor(
    public BookId:string="",
    public BookName:string="",
    public Price:number=0,
    public Image:string="",
    public Describe:string="",
    public Amount:number=0,
    public MaCD:string="",
    public MaNXB:string="",
    ) {}
}
