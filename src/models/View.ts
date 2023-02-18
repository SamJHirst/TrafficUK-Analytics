import { model, Schema } from 'mongoose';

interface IView {
    cookieId: string | null;
    path: string;
    sessionId: string;
    timestamp: number;
}

const ViewSchema = new Schema({
    cookieId: {
        default: null,
        type: String,
    },
    path: {
        required: true,
        type: String,
    },
    sessionId: {
        required: true,
        type: String,
    },
    timestamp: {
        required: true,
        type: Number,
    },
}, {
    versionKey: false,
});

const View = model<IView>('View', ViewSchema);

export {
    View,
    IView,
};
