import React, { Component, ReactElement, ComponentType } from "react";

class ErrorBoundary extends Component<
    {
        children: ReactElement;
        fallback: ReactElement;
    },
    {
        hasError: boolean;
    }
> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }

        return this.props.children;
    }
}

export default function withErrorBoundary<T extends Record<string, unknown>>(
    Component: ComponentType<T>,
    ErrorComponent: ReactElement
) {
    return function WithErrorBoundary(props: T) {
        return (
            <ErrorBoundary fallback={ErrorComponent}>
                <Component {...props} />
            </ErrorBoundary>
        );
    };
}
