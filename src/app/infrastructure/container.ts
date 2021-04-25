import { Container, decorate, injectable } from "inversify";
import { BooksService } from "../services/";
export const container = new Container();

decorate(injectable(), BooksService);
container.bind(BooksService).toSelf().inSingletonScope();
