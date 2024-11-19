import { SidebarProfileData } from '@/utils/menu-ui';
import React from 'react';
import LinkProfile from '../Link/LinkProfile';

const SidebarProfile = () => {
    return (
        <ul className="list-none flex flex-col">
            {SidebarProfileData.map((item, index) => (
                <LinkProfile key={index} href={item.path} title={item.name} icon={item.icon} />
            ))}
        </ul>
    );
};

export default SidebarProfile;