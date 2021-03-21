import { Loadable } from "recoil";

export const parseLoadableValue = <T>(fetchingState: Loadable<T> | Loadable<{ status: string, fetchedData: T }>) => {
    const { state, contents } = fetchingState;

    // @ts-ignore
    const successfulFetch = contents.status
        // @ts-ignore
        ? { status: contents.status, data: contents.fetchedData }
        : { status: 'hasValue', data: contents };

    switch (state) {
        case 'hasValue':
            return successfulFetch;
        case 'loading':
            return { status: 'loading', data: {} };
        case 'hasError':
            return { status: 'hasError', data: contents };
    }
};
