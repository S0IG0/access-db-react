import { useState, useEffect } from 'react';
import axios from 'axios';

const useIpAddress = () => {
    const [ipAddress, setIpAddress] = useState(null);

    useEffect(() => {
        const fetchIpAddress = async () => {
            try {
                const response = await axios.get('https://api64.ipify.org?format=json');
                setIpAddress(response.data.ip);
            } catch (error) {
                console.error('Error fetching IP address:', error);
            }
        };
        fetchIpAddress();
    }, []);

    return ipAddress;
};

export default useIpAddress;
