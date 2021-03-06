export class Scheduling {
    public static async sleepAsync(milliseconds: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }
}
