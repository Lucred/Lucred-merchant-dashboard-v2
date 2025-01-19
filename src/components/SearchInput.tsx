import { Input } from "./ui/input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <Input
      type='text'
      placeholder='Search by product or customer name'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='mt-4'
    />
  );
}
