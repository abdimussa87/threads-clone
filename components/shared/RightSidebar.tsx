function RightSidebar() {
  return (
    <div className="sticky top-0 right-0 z-20 flex flex-col justify-between h-screen gap-12 px-10 pb-6 overflow-auto border-l custom-scrollbar w-fit border-l-dark-4 bg-dark-2 pt-28 max-xl:hidden">
      <div className="flex flex-col flex-1">
        <h3 className="text-white text-heading4-medium">
          Suggested Communities
        </h3>
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="text-white text-heading4-medium">Suggested Users</h3>
      </div>
    </div>
  );
}

export default RightSidebar;
