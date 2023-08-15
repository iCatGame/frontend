"use client"

import Assets from "@/components/Assets";
import FooterApp from "@/components/FooterApp";
import HeaderApp from "@/components/HeaderApp";

const AssetPage = ({ params }) => {
    return (
        <div>
            <HeaderApp />
                <Assets tokenId={params.tokenId} />
            <FooterApp />
        </div>
    )
}

export default AssetPage;