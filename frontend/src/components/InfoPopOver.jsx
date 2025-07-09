import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info, Search, Trash2, Plus, ArrowLeft, Edit, Save, Eye } from "lucide-react";

const InfoPopOver = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="p-3 bg-[#3B3B3B] rounded-lg hover:bg-slate-600">
          <Info className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-[#3B3B3B] border-gray-600 text-white">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Icon Guide</h4>
            <p className="text-sm text-gray-400">
              Here's what the main icons do:
            </p>
          </div>
          <div className="grid gap-3">
            <h5 className="text-sm font-bold text-gray-300">Home Page</h5>
            <div className="grid grid-cols-[25px_1fr] items-center gap-4 pl-2">
              <Search className="h-5 w-5" />
              <p className="text-sm">Filter notes by title or content.</p>
            </div>
            <div className="grid grid-cols-[25px_1fr] items-center gap-4 pl-2">
              <Trash2 className="h-5 w-5" />
              <p className="text-sm">Toggle selection mode to delete notes.</p>
            </div>
            <div className="grid grid-cols-[25px_1fr] items-center gap-4 pl-2">
              <Plus className="h-5 w-5" />
              <p className="text-sm">Create a new note.</p>
            </div>
            <h5 className="text-sm font-bold text-gray-300 mt-2">Note Page</h5>
            <div className="grid grid-cols-[25px_1fr] items-center gap-4 pl-2">
              <ArrowLeft className="h-5 w-5" />
              <p className="text-sm">Go back to the home page.</p>
            </div>
            <div className="grid grid-cols-[25px_1fr] items-center gap-4 pl-2">
              <Edit className="h-5 w-5" />
              <p className="text-sm">Enter edit mode for the current note.</p>
            </div>
            <div className="grid grid-cols-[25px_1fr] items-center gap-4 pl-2">
              <Save className="h-5 w-5" />
              <p className="text-sm">Save your changes to the note.</p>
            </div>
            <div className="grid grid-cols-[25px_1fr] items-center gap-4 pl-2">
              <Eye className="h-5 w-5" />
              <p className="text-sm">Discard changes and exit edit mode.</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default InfoPopOver;
