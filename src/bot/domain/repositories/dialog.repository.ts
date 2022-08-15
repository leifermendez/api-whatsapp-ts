export default interface DialogRepository {
  getAnswer({ msg, contextId }: MsgInput): Promise<string>;
}

interface MsgInput {
  msg: string;
  contextId?: string;
}
