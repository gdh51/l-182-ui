export const PENDING = 'pending';
export const RESOLVED = 'resolved';
export const REJECTED = 'rejected';
export const TYPE_MAP = {
    resolve: {
        type: 'resolve',
        handler: 'onFulfilled',
        status: RESOLVED
    },
    reject: {
        type: 'reject',
        handler: 'onRejected',
        status: REJECTED
    }
};