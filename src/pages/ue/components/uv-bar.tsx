export const UVBar = ({ UV }: { UV: { u: number; v: number } }) => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-1">
          <div className="w-4 h-4 rounded-full bg-[#2B83F6]" />
          <span className="text-xs">V : Individual Integrity</span>
        </div>
        <div className="flex items-center gap-x-1">
          <div className="w-4 h-4 rounded-full bg-[#F1B163]" />
          <span className="text-xs">U : Social Conformity</span>
        </div>
      </div>
      <div className="relative w-4 h-48 border-2 border-[#B0B0B0]">
        <div
          className="absolute bottom-0 w-full transition-all duration-700"
          style={{
            height: `${(UV!.u + UV!.v) / 2}%`,
          }}
        >
          <div className="absolute top-[50%] left-5 w-28 text-lg font-semibold">
            {Math.abs(UV!.u - UV!.v) <= 10
              ? "U ≈ V"
              : UV!.u > UV!.v
              ? "U > V"
              : "U < V"}
          </div>
          <div
            className="absolute top-0 w-full bg-[#2B83F6]"
            style={{
              height: `${(UV!.v / (UV!.u + UV!.v)) * 100}%`,
            }}
          />
          <div
            className="absolute bottom-0 w-full bg-[#F1B163]"
            style={{
              height: `${(UV!.u / (UV!.u + UV!.v)) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
