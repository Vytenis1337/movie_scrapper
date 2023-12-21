import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';

const WatchTrailerModal = ({ isOpen, onClose }: any) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Watch Trailer</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* Your watch trailer section content goes here */}
                    <iframe
                        width="100%"
                        height="400"
                        src="https://www.youtube.com/embed/your-trailer-video-id"
                        title="Watch Trailer"
                        allowFullScreen
                    ></iframe>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default WatchTrailerModal;
