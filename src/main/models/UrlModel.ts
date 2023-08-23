import { Document, model, Model, Schema } from "mongoose";

export interface IUrl {
  shortUrl: string;
  longUrl: string;
}

export interface IUrlDocument extends IUrl, Document {}

const UrlSchema = new Schema<IUrlDocument>({
  shortUrl: { type: String, required: true, unique: true },
  longUrl: { type: String, required: true, unique: true },
});

const UrlModel = model<IUrlDocument>("Url", UrlSchema);
export default UrlModel;

type IUrlModel = Model<IUrlDocument>;
export { IUrlModel };
