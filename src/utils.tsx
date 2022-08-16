import React from 'react';

export const errorComponent = (text: string) => {
    return (
        <div>
            <p><strong>Error:</strong>{text}</p>
        </div>
    )
}