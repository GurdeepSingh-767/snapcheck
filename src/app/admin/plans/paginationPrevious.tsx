import React from 'react';
import { Button } from '@/components/ui/button';

interface PaginationPreviousProps {
  onClick: () => void;
  disabled: boolean;
}

const PaginationPrevious = ({ onClick, disabled }: PaginationPreviousProps) => {
  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
    >
      Previous
    </Button>
  );
};

export default PaginationPrevious;