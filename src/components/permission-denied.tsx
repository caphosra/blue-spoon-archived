import * as React from "react"

interface PermissionDeniedViewProps {
    
}

interface PermissionDeniedViewState {

}

export class PermissionDeniedView extends React.Component<PermissionDeniedViewProps, PermissionDeniedViewState> {
    constructor(props: PermissionDeniedViewProps) {
        super(props);
        this.state = {

        };
    }


    render() {
        return (
            <div>
                <p>
                    You can't access to here without logged in.<br />
                    Go <a href="../index.html">Login Form</a>.
                </p>
            </div>
        );
    }
}
