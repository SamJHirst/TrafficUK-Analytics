import { View } from "../models/View";

export default class ViewController {
    static async logPageView(cookieId: string | null, path: string, sessionId: string): Promise<void> {
        const pageView = new View({
            cookieId,
            path,
            sessionId,
            timestamp: Date.now(),
        });

        await pageView.save();
    }
}