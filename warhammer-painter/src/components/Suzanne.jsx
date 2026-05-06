import { useGLTF } from '@react-three/drei'

export default function Suzanne() {
    const { nodes } = useGLTF('/suzanne.glb')

    return (
        <group dispose={null}>
            {Object.keys(nodes).map((key) => {
                if (nodes[key].type === 'Mesh') {
                    return (
                        <mesh key={key} geometry={nodes[key].geometry}>
                            <meshStandardMaterial color="orange" />
                        </mesh>
                    )
                }
                return null
            })}
        </group>
    )
}