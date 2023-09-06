export {
    securifyToken,
    securifyObjByList,
};

function securifyToken(
    token: string | undefined,
    ahead = 12,
    behind = 3
): string {
    try {
        if( !token ) {
            throw new Error('Invalid token');
        }
        const lenToken = token.length;

        if( lenToken > ahead+behind ) {
            return (
                token.slice( 0, ahead )
                + '***'
                + token.substring( lenToken-behind )
            );
        }
        return securifyToken( token, ahead-1, behind-1 );
    }
    catch (e) {
        return '';
    }
}

// type TStringObj = {[key:string]: any};

function securifyObjByList (
    obj: Record<string, any>,
    propList: string[] = ['token']
)
: Record<string, any>
{
    const clone = Object.assign( {}, obj );

    function checkProperty (prop: string) {
        if( Object.prototype.hasOwnProperty.call( obj, prop )) {
            clone[prop] = securifyToken( clone[prop] );
        }
    }
    propList.map( checkProperty );
    return clone;
}
