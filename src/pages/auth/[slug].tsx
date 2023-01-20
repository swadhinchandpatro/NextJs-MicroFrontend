import { useRouter } from "next/router";
import dynamic from "next/dynamic";

type Slug = {
    slug:string | string[] | undefined
} 

const RemoteRoutes: React.ComponentType<Slug> = dynamic(() => import('remote/RemoteRoutes'), {
    ssr: false,
  })
 
const RemoteInner = () => {
    const router = useRouter();
    return(
        <>
        <h3>Assuming the react app will be inside this auth directory</h3>
        <RemoteRoutes slug={router?.query?.slug} />
        </>
    )
}

export default RemoteInner