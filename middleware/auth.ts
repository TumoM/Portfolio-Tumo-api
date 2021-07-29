

exports.withAuth = (req: any, res: any, next: () => void) => {
    console.log("Checking Auth with Middleware");
    next()
}